<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { _ } from 'svelte-i18n';
   
    $: disclosureItems = [
      { item: $_('legal_name'), value: $_('legal_name_value') },
      { item: $_('address'), value: $_('address_value') },
      { item: $_('phone_number'), value: $_('phone_number_value') },
      { item: $_('email_address'), value: $_('email_address_value') },
      { item: $_('head_of_operations'), value: $_('head_of_operations_value') },
      { item: $_('additional_fees'), value: $_('additional_fees_value') },
      { item: $_('exchanges_returns_policy'), value: $_('exchanges_returns_policy_value') },
      { item: $_('delivery_times'), value: $_('delivery_times_value') },
      { item: $_('accepted_payment_methods'), value: $_('accepted_payment_methods_value') },
      { item: $_('payment_period'), value: $_('payment_period_value') },
      { item: $_('price'), value: $_('price_value') },
    ];
  </script>
  
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">{$_('commerce_disclosure_title')}</h1>
    
    <Table striped={true}>
      <TableBody>
        {#each disclosureItems as { item, value }}
          <TableBodyRow>
            <TableBodyCell>{item}</TableBodyCell>
            <TableBodyCell>{value}</TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>